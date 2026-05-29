package com.orlyhal.dr_halachmi_clinic.blog;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

// Sends a one-time answer notification to the visitor whose question became a blog post.
@Service
public class QuestionAnswerNotificationService {

	private final String resendApiKey;
	private final String fromAddress;
	private final String publicBaseUrl;

	public QuestionAnswerNotificationService(
		@Value("${resend.api-key:}") String resendApiKey,
		@Value("${app.answer-notifications.from:noreply@dr-halachmi.com}") String fromAddress,
		@Value("${app.public.base-url:http://localhost:5173}") String publicBaseUrl
	) {
		this.resendApiKey = resendApiKey;
		this.fromAddress = fromAddress;
		this.publicBaseUrl = publicBaseUrl;
	}

	public DeliveryResult sendAnswerNotification(BlogQuestion question, BlogPost post) {
		if (resendApiKey == null || resendApiKey.isBlank()) {
			return DeliveryResult.skipped("The post was published, but no email was sent because mail is not configured.");
		}

		try {
			Resend resend = new Resend(resendApiKey);
			CreateEmailOptions params = CreateEmailOptions.builder()
				.from(fromAddress)
				.to(List.of(question.getEmail()))
				.subject("Your clinic question was answered")
				.text(buildBody(question, post))
				.build();
			resend.emails().send(params);
			return DeliveryResult.sent("The post was published and the answer email was sent to the visitor.");
		} catch (ResendException exception) {
			return DeliveryResult.failed(
				"The post was published, but sending the answer email failed. Save the post again after mail is configured."
			);
		}
	}

	private String buildBody(BlogQuestion question, BlogPost post) {
		return """
			שלום %s,

			השאלה שהשארת באתר הקליניקה של דוקטור אורלי הלחמי נענתה

			שאלה:
			%s

			תשובה:
			%s

			לתגובות נוספות או לשאלות המשך, תוכלו לפנות אלינו בחשבון האמייל
			md.halachmi@gmail.com

			תוכל למצוא גם את שאלתך באתר הקליניקה
			%s

			Best regards,
			Dr. Orly Halachmi Clinic
			""".formatted(
			question.getName(),
			post.getQuestion(),
			post.getAnswer(),
			buildBlogUrl()
		);
	}

	private String buildBlogUrl() {
		return publicBaseUrl.replaceAll("/+$", "") + "/#blog";
	}

	public record DeliveryResult(boolean sent, String message) {
		static DeliveryResult sent(String message) {
			return new DeliveryResult(true, message);
		}

		static DeliveryResult skipped(String message) {
			return new DeliveryResult(false, message);
		}

		static DeliveryResult failed(String message) {
			return new DeliveryResult(false, message);
		}
	}
}
