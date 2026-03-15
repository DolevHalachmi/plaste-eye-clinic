const questions = [
  ['מתי כדאי לפנות לבדיקת פזילה?', 'כאשר מופיעה סטייה בעיניים, תלונות על ראייה כפולה או חשד מצד ההורים.'],
  ['האם כל פזילה מחייבת ניתוח?', 'לא. בחלק מהמקרים ניתן לטפל במשקפיים, סגירות עין או מעקב מסודר.'],
  ['מה היתרון בגישה אסתטית טבעית?', 'התאמת הטיפול למבנה הפנים כך שהתוצאה תישאר עדינה והרמונית.'],
];

export default function Blog() {
  return (
    <section className="simple-page">
      <h1>בלוג שאלות ותשובות</h1>
      <div className="faq-list">
        {questions.map(([question, answer]) => (
          <article key={question} className="content-card faq-item">
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
