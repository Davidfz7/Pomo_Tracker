
package main.controllers;

import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import main.tables.ProductivityLog;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import main.services.productivity_log.ProductivityLogService;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class ProductivityController {
    
    private final ProductivityLogService productivityLogService;
    @GetMapping("/sayhi")
    public String getTest(){
        return "Hi David";    
    }
    
    @PostMapping("/save")
    public String test(@RequestBody ProductivityLog productivityLog ){
        System.out.println("Aqui broteeeer " + productivityLog.getDateRecorded().toString());
        productivityLog.setDateRecorded("");
        
        productivityLogService.saveDay(productivityLog);
        return productivityLog.toString();
    }
}
