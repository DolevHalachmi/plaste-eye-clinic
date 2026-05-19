package com.orlyhal.dr_halachmi_clinic.blog;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

	// Returns posts in the order the blog page expects to render them.
	List<BlogPost> findAllByOrderByUpdatedAtDescIdDesc();

	boolean existsBySourceQuestionId(Long sourceQuestionId);

	boolean existsBySourceQuestionIdAndIdNot(Long sourceQuestionId, Long id);
}
