package com.example.demo.controllers;

import java.util.Calendar;

import com.example.demo.beans.UpdatesHistory;
import com.example.demo.beans.User;
import com.example.demo.dao.UserDao;
import com.example.demo.dao.UpdateHistoryDao;

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
	@Autowired 
	UpdateHistoryDao  uHDao;	

	  @PutMapping(path = "/updateUser/{id}")
	    public Optional<User> updateUser(@PathVariable("id") Long id,
	    		@RequestParam(value="avatar", required=false) MultipartFile avatar,
	    		@RequestParam(value="name" , reaquired=false) String name, 
	    		@RequestParam(value="email", required=false ) String email, 
	    		@RequestParam(value="updateDate", required=false ) Date updateDate
	    		){
	        User updatedUser = uDao.findById(id).get();
	                
	      
	        
	        
	       if (user == null) {
	    	   //throw new NotFoundException("User does not exist" );
	    	   
	       }else {
	 	      ;
	 	       if(name!= null)
				{  updatedUser.setName(name);
	 	    	 
			        UpdatesHistory newUpdate= new UpdatesHistory();
			        newUpdate.setFieldName("name");
			        newUpdate.setValue(name);
			        newUpdate.setDateUpdate(Calendar.getInstance().getTime());
			        newUpdate.setUser(updatedUser);
			        uHDao.save(newUpdate);
			        
				}
	 	       if(email!=null) {
		 	        updatedUser.setEmail(email);
		 	        
			        UpdatesHistory newUpdate= new UpdatesHistory();
			        newUpdate.setFieldName("email");
			        newUpdate.setValue(email);
			        newUpdate.setDateUpdate(Calendar.getInstance().getTime());
			        newUpdate.setUser(updatedUser);
			        uHDao.save(newUpdate);
			        

	 	    	   
	 	       }
	 	      if(avatar!=null) {
		 	        updatedUser.setAvatar(avatar);
		 	        
			        UpdatesHistory newUpdate= new UpdatesHistory();
			        newUpdate.setFieldName("avatar");
			        newUpdate.setValue(avatar);
			        newUpdate.setDateUpdate(Calendar.getInstance().getTime());
			        newUpdate.setUser(updatedUser);
			        uHDao.save(newUpdate);
			        

	 	    	   
	 	       }
	    	   
			}
	       
	       
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
	  @GetMapping(path = "/getHistory/{id}")
	    public Optional<UpdatesHistory> getUserupdates(@PathVariable("id") Long id,
	    		){
	        User updatedUser = uDao.findById(id).orElse(null);
	       if (user == null) {
	    	   //throw new NotFoundException("User does not exist" );
	    	   
	       }

	        return updatedUser.getUpdates();
	    }



}
