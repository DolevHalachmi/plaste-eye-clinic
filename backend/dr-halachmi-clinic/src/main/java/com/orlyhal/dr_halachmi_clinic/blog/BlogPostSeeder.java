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
				"When should I schedule an eye exam for suspected strabismus?",
				"When you notice eye misalignment, double vision complaints, or a concern raised by the parents.",
				null
			),
			new BlogPost(
				"Does every strabismus case require surgery?",
				"No. Some cases can be treated with glasses, patching, or a structured follow-up plan.",
				null
			),
			new BlogPost(
				"What is the benefit of a natural aesthetic approach?",
				"It tailors the treatment to the patient's facial structure so the result stays subtle and balanced.",
				null
			)
		));
	}
}
