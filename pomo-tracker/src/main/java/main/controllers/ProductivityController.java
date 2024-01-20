package main.controllers;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import main.dto.ProductivityLogDTO;
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
    public String getTest() {
        return "Hi David";
    }

    @PostMapping("/save")
    public String test(@RequestBody ProductivityLogDTO productivityLogDTO) {
        String activityType = productivityLogDTO.getActivityType();
        LocalDate dateRecorded = productivityLogDTO.getDateRecordedAsLocalDate();
        int hoursCount = productivityLogDTO.getHoursCount();
        ProductivityLog prodTable = productivityLogService.findByActivityTypeAndDateRecorded(activityType, dateRecorded);
        if(prodTable == null){
            ProductivityLog rowValue = new ProductivityLog(activityType, hoursCount, dateRecorded);
            productivityLogService.saveDay(rowValue);
            return "Data_saved";
        }
        prodTable.setHoursCount(hoursCount);
        productivityLogService.saveDay(prodTable);
        return "existing_activity_on_date";
    }
}
