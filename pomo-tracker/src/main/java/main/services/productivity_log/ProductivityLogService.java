package main.services.productivity_log;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import main.tables.ProductivityLog;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductivityLogService {

    private final ProductivityLogRepository productivityLogRepository;

    public void saveDay(ProductivityLog day) {
        productivityLogRepository.save(day);
    }

    public ProductivityLog findByActivityTypeAndDateRecorded(String activityType, LocalDate dateRecorded) {
        ProductivityLog prodTable;
        try {
            prodTable = productivityLogRepository.findByActivityTypeAndDateRecorded(activityType, dateRecorded);
        } catch (Exception e) {
            return null;
        }
        return prodTable;
    }

//    public ProductivityLog findByActivityType(String activityType){
//        return productivityLogRepository.findByActivityType(activityType);
//    }
}
