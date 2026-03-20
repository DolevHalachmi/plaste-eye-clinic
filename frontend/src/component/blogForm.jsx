import { useState } from 'react';

export default function blogForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    // later you can send this to backend with fetch()

    alert('הטופס נשלח');

    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      comment: '',
    });
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      comment: '',
    });
  };

  return (
    <section className="leave-message">
      <div className="leave-box">
        <form onSubmit={handleSubmit}>
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
              placeholder="שם"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="phone">
              <svg
                className="leave-message-icon"
                id="telephone-icon"
                viewBox="0 0 512 512"
              >
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
            </label>

            <input
              type="tel"
              id="phone"
              placeholder="0505311200"
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="second-row">
            <label htmlFor="email">
              <svg
                className="leave-message-icon"
                id="mail-icon"
                viewBox="0 -960 960 960"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </label>

            <input
              type="email"
              id="email"
              placeholder="md.halachmi@gmail.com"
              required
              value={formData.email}
              onChange={handleChange}
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
              placeholder="נושא"
              maxLength="200"
              value={formData.subject}
              onChange={handleChange}
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
              placeholder="טקסט"
              required
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <input
            type="button"
            value="לנקות"
            id="resetBtn"
            onClick={handleReset}
          />
          <br />
          <input type="submit" value="לשלוח" id="submitBtn" />
        </form>
      </div>
    </section>
  );
}