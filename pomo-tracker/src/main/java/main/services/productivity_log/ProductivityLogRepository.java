
package main.services.productivity_log;

import main.tables.ProductivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductivityLogRepository extends JpaRepository<ProductivityLog, Object> {
    
}
