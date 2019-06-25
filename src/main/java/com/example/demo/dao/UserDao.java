package com.example.demo.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.demo.beans.User;

import java.util.Set;

public class UserDao extends JpaRepository<User, Long>{


	 
	 
	public Optional<User> findById(Long id);
	



}
