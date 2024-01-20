
package main.services.productivity_log;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import main.tables.ProductivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductivityLogRepository extends JpaRepository<ProductivityLog, Object> {
    ProductivityLog findByActivityTypeAndDateRecorded(String activityType, LocalDate dateRecorded);
    ProductivityLog findByActivityType(String activityType);
}
