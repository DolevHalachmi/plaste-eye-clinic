package com.orlyhal.dr_halachmi_clinic.auth;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

// Tracks login attempts per IP and enforces a sliding-window rate limit.
@Service
public class RateLimitService {

	// 6 attempts allowed per 15-minute window per IP.
	private static final int LOGIN_CAPACITY = 6;
	private static final Duration LOGIN_REFILL_PERIOD = Duration.ofMinutes(15);

	// Warn the user when this many attempts or fewer remain.
	private static final int WARNING_THRESHOLD = 3;

	private final ConcurrentHashMap<String, Bucket> loginBuckets = new ConcurrentHashMap<>();

	// Returns the existing bucket for this IP, or creates a fresh one.
	private Bucket getLoginBucket(String ip) {
		return loginBuckets.computeIfAbsent(ip, k ->
			Bucket.builder()
				.addLimit(Bandwidth.builder()
					.capacity(LOGIN_CAPACITY)
					.refillGreedy(LOGIN_CAPACITY, LOGIN_REFILL_PERIOD)
					.build())
				.build()
		);
	}

	// Consumes one token for the given IP and returns the result with an optional warning.
	public LoginRateLimitResult consumeLoginAttempt(String ip) {
		Bucket bucket = getLoginBucket(ip);
		ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

		if (!probe.isConsumed()) {
			return LoginRateLimitResult.blocked("Too many attempts, please try again later.");
		}

		long remaining = probe.getRemainingTokens();
		if (remaining <= WARNING_THRESHOLD) {
			String noun = remaining == 1 ? "attempt" : "attempts";
			return LoginRateLimitResult.allowedWithWarning(
				"You have " + remaining + " more " + noun + " left."
			);
		}

		return LoginRateLimitResult.allowed();
	}

	public record LoginRateLimitResult(boolean permitted, String warningMessage) {

		static LoginRateLimitResult allowed() {
			return new LoginRateLimitResult(true, null);
		}

		static LoginRateLimitResult allowedWithWarning(String message) {
			return new LoginRateLimitResult(true, message);
		}

		static LoginRateLimitResult blocked(String message) {
			return new LoginRateLimitResult(false, message);
		}

		public boolean hasWarning() {
			return warningMessage != null;
		}
	}
}
