
package main.services.productivity_log;

import lombok.RequiredArgsConstructor;
import main.tables.ProductivityLog;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductivityLogService {
    private final ProductivityLogRepository productivityLogRepository;
    public void saveDay(ProductivityLog day){
        productivityLogRepository.save(day);
    }
}
