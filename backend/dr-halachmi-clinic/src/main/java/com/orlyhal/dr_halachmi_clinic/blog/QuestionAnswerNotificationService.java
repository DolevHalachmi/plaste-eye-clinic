package com.orlyhal.dr_halachmi_clinic.blog;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Sends a one-time answer notification to the visitor whose question became a blog post.
@Service
public class QuestionAnswerNotificationService {

	private final ObjectProvider<JavaMailSender> mailSenderProvider;
	private final String fromAddress;
	private final String publicBaseUrl;

	public QuestionAnswerNotificationService(
		ObjectProvider<JavaMailSender> mailSenderProvider,
		@Value("${app.answer-notifications.from:}") String fromAddress,
		@Value("${app.public.base-url:http://localhost:5173}") String publicBaseUrl
	) {
		this.mailSenderProvider = mailSenderProvider;
		this.fromAddress = fromAddress;
		this.publicBaseUrl = publicBaseUrl;
	}

	public DeliveryResult sendAnswerNotification(BlogQuestion question, BlogPost post) {
		JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
		if (mailSender == null) {
			return DeliveryResult.skipped("The post was published, but no email was sent because mail is not configured.");
		}

		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(question.getEmail());

			if (!fromAddress.isBlank()) {
				message.setFrom(fromAddress);
			}

			message.setSubject("Your clinic question was answered");
			message.setText(buildBody(question, post));
			mailSender.send(message);
			return DeliveryResult.sent("The post was published and the answer email was sent to the visitor.");
		} catch (MailException exception) {
			System.err.println("Mail send failed: " + exception.getMessage());
			exception.printStackTrace();
			return DeliveryResult.failed("The post was published, but sending the answer email failed. Save the post again after mail is configured.");
		}

		}
	}

	private String buildBody(BlogQuestion question, BlogPost post) {
		return """
			שלום %s,
			
			השאלה שהשארת באתר הקליניקה של דוקטור אורלי הלחמי נענתה,
			
			Question:
			%s
			
			Answer:
			%s
			
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
