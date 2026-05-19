import { useCallback, useEffect, useState } from 'react';

const emptyVisitorForm = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  comment: '',
};

const emptyPostForm = {
  question: '',
  answer: '',
  sourceQuestionId: null,
};

// Reads JSON safely even when the backend returns an empty body.
async function readJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

// Formats backend timestamps for the admin UI.
function formatDate(value) {
  if (!value) {
    return '';
  }

  return new Intl.DateTimeFormat('en-IL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

// Renders the public blog and the admin tools in the same page.
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [visitorForm, setVisitorForm] = useState(emptyVisitorForm);
  const [postForm, setPostForm] = useState(emptyPostForm);
  const [admin, setAdmin] = useState(null);
  const [questionIdeas, setQuestionIdeas] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [postsState, setPostsState] = useState({ loading: true, error: '' });
  const [visitorState, setVisitorState] = useState({ loading: false, error: '', message: '' });
  const [editorState, setEditorState] = useState({ loading: false, error: '', message: '' });
  const [ideasState, setIdeasState] = useState({ loading: false, error: '' });

  // Loads visitor questions for the admin idea list.
  const loadQuestionIdeas = useCallback(async () => {
    setIdeasState({ loading: true, error: '' });

    try {
      const response = await fetch('/api/admin/blog/questions', {
        credentials: 'include',
      });
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error('Failed to load questions');
      }

      setQuestionIdeas(Array.isArray(data) ? data : []);
      setIdeasState({ loading: false, error: '' });
    } catch {
      setQuestionIdeas([]);
      setIdeasState({
        loading: false,
        error: 'We could not load the saved visitor questions right now.',
      });
    }
  }, []);

  // Restores the logged-in admin session and unlocks admin-only tools.
  const loadAdminSession = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/auth/session', {
        credentials: 'include',
      });
      const data = await readJson(response);

      if (!response.ok) {
        setAdmin(null);
        setQuestionIdeas([]);
        return;
      }

      setAdmin(data.admin);
      await loadQuestionIdeas();
    } catch {
      setAdmin(null);
      setQuestionIdeas([]);
    }
  }, [loadQuestionIdeas]);

  // Fetches the published blog cards shown to regular visitors.
  const loadPosts = useCallback(async () => {
    setPostsState({ loading: true, error: '' });

    try {
      const response = await fetch('/api/blog/posts');
      const data = await readJson(response);

      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      setPosts(Array.isArray(data) ? data : []);
      setPostsState({ loading: false, error: '' });
    } catch {
      setPosts([]);
      setPostsState({
        loading: false,
        error: 'We could not load the blog right now. Please refresh and try again.',
      });
    }
  }, []);

  // Loads both the public blog data and the current admin session on first render.
  useEffect(() => {
    loadPosts();
    loadAdminSession();
  }, [loadAdminSession, loadPosts]);

  // Keeps the visitor question form in sync with the inputs.
  function handleVisitorChange({ target }) {
    const { name, value } = target;
    setVisitorForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // Keeps the admin blog editor form in sync with the inputs.
  function handlePostChange({ target }) {
    const { name, value } = target;
    setPostForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  // Sends a visitor question to the database and refreshes admin ideas when needed.
  async function handleVisitorSubmit(event) {
    event.preventDefault();
    setVisitorState({ loading: true, error: '', message: '' });

    try {
      const response = await fetch('/api/blog/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorForm),
      });
      const data = await readJson(response);

      if (!response.ok) {
        setVisitorState({
          loading: false,
          error: data.message ?? 'We could not save your question. Please try again.',
          message: '',
        });
        return;
      }

      setVisitorForm(emptyVisitorForm);
      setVisitorState({
        loading: false,
        error: '',
        message: data.message ?? 'Your question was sent successfully.',
      });

      if (admin) {
        loadQuestionIdeas();
      }
    } catch {
      setVisitorState({
        loading: false,
        error: 'Submission failed right now. Please make sure the server is running and try again.',
        message: '',
      });
    }
  }

  // Opens a clean editor so the admin can create a new post.
  function openNewPostEditor() {
    setIsEditorOpen(true);
    setEditingPostId(null);
    setPostForm(emptyPostForm);
    setEditorState({ loading: false, error: '', message: '' });
  }

  // Loads an existing post into the editor for quick updates.
  function openEditPostEditor(post) {
    setIsEditorOpen(true);
    setEditingPostId(post.id);
    setPostForm({
      question: post.question,
      answer: post.answer,
      sourceQuestionId: post.sourceQuestionId ?? null,
    });
    setEditorState({ loading: false, error: '', message: '' });
  }

  // Resets the editor back to its closed, empty state.
  function closeEditor() {
    setIsEditorOpen(false);
    setEditingPostId(null);
    setPostForm(emptyPostForm);
    setEditorState({ loading: false, error: '', message: '' });
  }

  // Copies a submitted question into the editor as a starting point for a post.
  function fillEditorFromQuestionIdea(questionIdea) {
    setIsEditorOpen(true);
    setEditingPostId(null);
    setPostForm({
      question: questionIdea.comment || questionIdea.subject,
      answer: '',
      sourceQuestionId: questionIdea.id,
    });
    setEditorState({ loading: false, error: '', message: '' });
  }

  // Creates or updates a blog card, depending on the current editor mode.
  async function handlePostSubmit(event) {
    event.preventDefault();
    setEditorState({ loading: true, error: '', message: '' });

    const requestUrl = editingPostId
      ? `/api/admin/blog/posts/${editingPostId}`
      : '/api/admin/blog/posts';

    try {
      const response = await fetch(requestUrl, {
        method: editingPostId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(postForm),
      });
      const data = await readJson(response);

      if (!response.ok) {
        setEditorState({
          loading: false,
          error: data.message ?? 'Saving the blog post failed. Please try again.',
          message: '',
        });
        return;
      }

      await loadPosts();
      await loadQuestionIdeas();
      closeEditor();
      setEditorState({
        loading: false,
        error: '',
        message: data.message ?? (editingPostId ? 'The blog card was updated.' : 'A new blog card was published.'),
      });
    } catch {
      setEditorState({
        loading: false,
        error: 'We could not save the blog post right now.',
        message: '',
      });
    }
  }

  // Removes a published blog card after an admin confirmation.
  async function handleDeletePost(postId) {
    if (!window.confirm('Delete this blog card?')) {
      return;
    }

    setEditorState({ loading: true, error: '', message: '' });

    try {
      const response = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await readJson(response);

      if (!response.ok) {
        setEditorState({
          loading: false,
          error: data.message ?? 'Deleting the card failed.',
          message: '',
        });
        return;
      }

      if (editingPostId === postId) {
        closeEditor();
      }

      await loadPosts();
      setEditorState({
        loading: false,
        error: '',
        message: data.message ?? 'The blog card was deleted.',
      });
    } catch {
      setEditorState({
        loading: false,
        error: 'We could not delete the card right now.',
        message: '',
      });
    }
  }

  // Removes a submitted visitor question from the admin idea list.
  async function handleDeleteQuestion(questionId) {
    if (!window.confirm('Delete this visitor question from the idea list?')) {
      return;
    }

    setIdeasState((current) => ({
      ...current,
      loading: true,
      error: '',
    }));

    try {
      const response = await fetch(`/api/admin/blog/questions/${questionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await readJson(response);

      if (!response.ok) {
        setIdeasState({
          loading: false,
          error: data.message ?? 'Deleting the question failed.',
        });
        return;
      }

      await loadQuestionIdeas();
    } catch {
      setIdeasState({
        loading: false,
        error: 'We could not delete the question right now.',
      });
    }
  }

  return (
    <>
      <section className="simple-page blog-page">
        <div className="blog-header">
          <h1>בלוג שאלות ותשובות</h1>
          <p>
            כאן יכולים מבקרים לקרוא תשובות לשאלות נפוצות ולהשאיר שאלה חדשה לצוות המרפאה לבדיקה
            ונחזור אליכם עם תשובה במייל
          </p>

          {admin ? (
            <div className="blog-admin-bar">
              <span className="blog-admin-pill">Logged in as admin: {admin.displayName}</span>
              <button type="button" className="blog-primary-button" onClick={openNewPostEditor}>
                New post
              </button>
            </div>
          ) : null}
        </div>

        {isEditorOpen ? (
          <form className="content-card blog-admin-editor" onSubmit={handlePostSubmit}>
            <h2>{editingPostId ? 'Edit blog card' : 'New blog card'}</h2>
            {postForm.sourceQuestionId ? (
              <p className="blog-meta">
                This post is linked to a visitor question. Saving it will send the answer email if one has not already
                been sent for this question.
              </p>
            ) : null}
            <div className="blog-editor-grid">
              <label>
                <span>Question</span>
                <input
                  type="text"
                  name="question"
                  value={postForm.question}
                  onChange={handlePostChange}
                  maxLength="300"
                  required
                />
              </label>

              <label>
                <span>Answer</span>
                <textarea
                  name="answer"
                  rows="6"
                  value={postForm.answer}
                  onChange={handlePostChange}
                  required
                />
              </label>
            </div>

            <div className="blog-editor-actions">
              <button type="submit" className="blog-primary-button" disabled={editorState.loading}>
                {editorState.loading ? 'Saving...' : editingPostId ? 'Save changes' : 'Publish post'}
              </button>
              <button type="button" className="blog-secondary-button" onClick={closeEditor}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {editorState.error ? <p className="blog-feedback error">{editorState.error}</p> : null}
        {!editorState.error && editorState.message ? (
          <p className="blog-feedback success">{editorState.message}</p>
        ) : null}

        {postsState.error ? <p className="blog-feedback error">{postsState.error}</p> : null}

        <div className="faq-list">
          {postsState.loading ? (
            <article className="content-card faq-item blog-empty-state">
              <p>Loading posts...</p>
            </article>
          ) : null}

          {!postsState.loading && !posts.length ? (
            <article className="content-card faq-item blog-empty-state">
              <p>No blog posts have been published yet.</p>
            </article>
          ) : null}

          {posts.map((post) => (
            <article key={post.id} className="content-card faq-item">
              <div className="blog-card-top">
                <div>
                  <h3>{post.question}</h3>
                  {post.updatedAt ? (
                    <p className="blog-meta">Updated: {formatDate(post.updatedAt)}</p>
                  ) : null}
                </div>

                {admin ? (
                  <div className="blog-card-actions">
                    <button
                      type="button"
                      className="blog-secondary-button"
                      onClick={() => openEditPostEditor(post)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="blog-danger-button"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
              <p>{post.answer}</p>
            </article>
          ))}
        </div>

        {admin ? (
          <section className="blog-idea-section">
            <div className="blog-header">
              <h2>Visitor question inbox</h2>
              <p>Questions submitted from the site are stored here so the clinic can turn them into future posts.</p>
            </div>

            {ideasState.error ? <p className="blog-feedback error">{ideasState.error}</p> : null}

            <div className="blog-idea-list">
              {ideasState.loading && !questionIdeas.length ? (
                <article className="content-card blog-idea-card">
                  <p>Loading saved questions...</p>
                </article>
              ) : null}

              {!ideasState.loading && !questionIdeas.length ? (
                <article className="content-card blog-idea-card">
                  <p>No visitor questions have been saved yet.</p>
                </article>
              ) : null}

              {questionIdeas.map((questionIdea) => (
                <article key={questionIdea.id} className="content-card blog-idea-card">
                  <h3>{questionIdea.subject || 'Question without a subject'}</h3>
                  <p className="blog-meta">
                    {questionIdea.name} | {questionIdea.email}
                    {questionIdea.phone ? ` | ${questionIdea.phone}` : ''}
                  </p>
                  <p className="blog-meta">Received: {formatDate(questionIdea.createdAt)}</p>
                  {questionIdea.answeredPostId ? (
                    <p className="blog-meta">
                      {questionIdea.answerNotificationSentAt
                        ? 'This question has already been answered and the email notification was sent.'
                        : 'This question has already been answered on the site, but no email send was recorded yet.'}
                    </p>
                  ) : null}
                  <p>{questionIdea.comment}</p>
                  <div className="blog-idea-actions">
                    <button
                      type="button"
                      className="blog-primary-button"
                      onClick={() => fillEditorFromQuestionIdea(questionIdea)}
                      disabled={Boolean(questionIdea.answeredPostId)}
                    >
                      {questionIdea.answeredPostId ? 'Already answered' : 'Use as post idea'}
                    </button>
                    <button
                      type="button"
                      className="blog-danger-button"
                      onClick={() => handleDeleteQuestion(questionIdea.id)}
                    >
                      Delete question
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <div className="leave-message-header">
        <h2>להשארת שאלה...</h2>
      </div>

      <section className="leave-message">
        <div className="leave-box">
          <form onSubmit={handleVisitorSubmit}>
            <div className="first-row">
              <label htmlFor="name">
                <svg
                  className="leave-message-icon"
                  id="person-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M96 96C60.7 96 32 124.7 32 160L32 480C32 515.3 60.7 544 96 544L544 544C579.3 544 608 515.3 608 480L608 160C608 124.7 579.3 96 544 96L96 96zM176 352L240 352C284.2 352 320 387.8 320 432C320 440.8 312.8 448 304 448L112 448C103.2 448 96 440.8 96 432C96 387.8 131.8 352 176 352zM152 256C152 225.1 177.1 200 208 200C238.9 200 264 225.1 264 256C264 286.9 238.9 312 208 312C177.1 312 152 286.9 152 256zM392 208L504 208C517.3 208 528 218.7 528 232C528 245.3 517.3 256 504 256L392 256C378.7 256 368 245.3 368 232C368 218.7 378.7 208 392 208zM392 304L504 304C517.3 304 528 314.7 528 328C528 341.3 517.3 352 504 352L392 352C378.7 352 368 341.3 368 328C368 314.7 378.7 304 392 304z" />
                </svg>
              </label>

              <input
                type="text"
                id="name"
                placeholder="שם (דרוש)"
                name="name"
                value={visitorForm.name}
                onChange={handleVisitorChange}
                required
              />

              <label htmlFor="phone">
                <svg className="leave-message-icon" id="telephone-icon" viewBox="0 0 512 512">
                  <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
                </svg>
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="0505311200"
                value={visitorForm.phone}
                onChange={handleVisitorChange}
                pattern="[0-9]{10}"
              />
            </div>

            <div className="second-row">
              <label htmlFor="email">
                <svg className="leave-message-icon" id="mail-icon" viewBox="0 -960 960 960">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                </svg>
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={visitorForm.email}
                onChange={handleVisitorChange}
                placeholder="example@gmail.com (דרוש)"
                required
              />

              <label htmlFor="subject">
                <svg
                  className="leave-message-icon"
                  id="subject-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M352.9 21.2L308 66.1 445.9 204 490.8 159.1C504.4 145.6 512 127.2 512 108s-7.6-37.6-21.2-51.1L455.1 21.2C441.6 7.6 423.2 0 404 0s-37.6 7.6-51.1 21.2zM274.1 100L58.9 315.1c-10.7 10.7-18.5 24.1-22.6 38.7L.9 481.6c-2.3 8.3 0 17.3 6.2 23.4s15.1 8.5 23.4 6.2l127.8-35.5c14.6-4.1 27.9-11.8 38.7-22.6L412 237.9 274.1 100z" />
                </svg>
              </label>

              <input
                type="text"
                id="subject"
                placeholder="Subject"
                onChange={handleVisitorChange}
                name="subject"
                value={visitorForm.subject}
                maxLength="200"
              />
            </div>

            <div className="comment-group">
              <label htmlFor="comment">
                <svg
                  className="leave-message-icon"
                  id="comment-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 240c0 132.5-114.6 240-256 240-37.1 0-72.3-7.4-104.1-20.7L33.5 510.1c-9.4 4-20.2 1.7-27.1-5.8S-2 485.8 2.8 476.8l48.8-92.2C19.2 344.3 0 294.3 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240z" />
                </svg>
              </label>

              <textarea
                id="comment"
                rows="4"
                cols="50"
                onChange={handleVisitorChange}
                placeholder="טקסט שאלה (דרוש)"
                name="comment"
                value={visitorForm.comment}
                required
              />
            </div>

            <input type="button" value="Clear" id="resetBtn" onClick={() => setVisitorForm(emptyVisitorForm)} />
            <br />
            <input
              type="submit"
              value={visitorState.loading ? 'Sending...' : 'Send'}
              id="submitBtn"
              disabled={visitorState.loading}
            />

            {visitorState.error ? <p className="blog-feedback error">{visitorState.error}</p> : null}
            {!visitorState.error && visitorState.message ? (
              <p className="blog-feedback success">{visitorState.message}</p>
            ) : null}
          </form>
        </div>
      </section>
    </>
  );
}
