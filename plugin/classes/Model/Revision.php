<?php

namespace Palasthotel\WordPress\Corrections\Model;

class Revision {
	public int $revision_post_id;
	public int $author;
	public int $timestamp;

	private ?string $authorDisplayName = null;

	public function __construct(int $revision_post_id, int $author, int $timestamp) {
		$this->revision_post_id = $revision_post_id;
		$this->author           = $author;
		$this->timestamp = $timestamp;
	}

	public function getAuthorName(){
		if($this->authorDisplayName != null) return $this->authorDisplayName;
		$user =  get_user_by('ID', $this->author);
		$this->authorDisplayName = $user instanceof \WP_User ? $user->display_name : "Unbekannt 🚨";
		return $this->authorDisplayName;
	}

}
