package com.orlyhal.dr_halachmi_clinic.blog;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogQuestionRepository extends JpaRepository<BlogQuestion, Long> {

	// Returns the newest submitted questions first for the admin idea list.
	List<BlogQuestion> findAllByOrderByCreatedAtDescIdDesc();
}
