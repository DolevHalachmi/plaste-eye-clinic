package com.orlyhal.dr_halachmi_clinic.blog;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Seeds the first blog cards once so the page is not empty on a fresh database.
@Component
public class BlogPostSeeder implements CommandLineRunner {

	private final BlogPostRepository blogPostRepository;

	// Injects the repository used for the first-time blog seed.
	public BlogPostSeeder(BlogPostRepository blogPostRepository) {
		this.blogPostRepository = blogPostRepository;
	}

	@Override
	// Seeds the starter cards only when the database is still empty.
	public void run(String... args) {
		if (blogPostRepository.count() > 0) {
			return;
		}

		blogPostRepository.saveAll(List.of(
			new BlogPost(
				"מתי כדאי לפנות לבדיקת פזילה?",
				"כאשר מופיעה סטייה בעיניים, תלונות על ראייה כפולה או חשד מצד ההורים."
			),
			new BlogPost(
				"האם כל פזילה מחייבת ניתוח?",
				"לא. בחלק מהמקרים ניתן לטפל במשקפיים, סגירות עין או מעקב מסודר."
			),
			new BlogPost(
				"מה היתרון בגישה אסתטית טבעית?",
				"התאמת הטיפול למבנה הפנים כך שהתוצאה תישאר עדינה והרמונית."
			)
		));
	}
}
