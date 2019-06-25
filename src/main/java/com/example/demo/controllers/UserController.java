package com.example.demo.controllers;

import java.util.Calendar;

import com.example.demo.beans.User;
import com.example.demo.dao.UserDao;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/users")
public class UserController {
	
	
	@Autowired 
	UserDao uDao;
	

	  @PutMapping(path = "/updateUser/{id}")
	    public Optional<User> updateUser(@PathVariable("id") Long id,
	    		@RequestParam(value="avatar") MultipartFile avatar,
	    		@RequestParam(value="name" ) String name, 
	    		@RequestParam(value="email" ) String email, 
	    		){
	        User updatedUser = uDao.findById(id).get();
	       if (user == null) {
	    	   //throw new NotFoundException("User does not exist" );
	    	   
	       }
	        updatedUser.setName(name);
	        updatedUser.setEmail(email);
	        updatedUser.setAvatar(file);
	        updatedUser.setLastUpdate(Calendar.getInstance().getTime());
	        uDao.save(updatedUser);

	      
	        return updatedUser;
	    }
	  
	  
	  @GetMapping(path = "/getUser/{id}")
	    public Optional<User> getUser(@PathVariable("id") Long id,
	    		){
	        User updatedUser = uDao.findById(id).orElse(null);
	       if (user == null) {
	    	   //throw new NotFoundException("User does not exist" );
	    	   
	       }

	        return updatedUser;
	    }



}
