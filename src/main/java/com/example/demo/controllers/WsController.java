package com.example.demo.controllers;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WsController {
	

	    @MessageMapping("/all")
	    @SendTo("/topic/all")
	    public String post(@Payload Map<String, String> message) {
	        message.put("timestamp", Long.toString(System.currentTimeMillis()));
	        return message;
	    }

}
