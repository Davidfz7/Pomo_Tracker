
package main.tables;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productivity_logs")
public class ProductivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "activity_type", nullable = false, length=50)
    private String activityType;
    @Column(name = "hours_count", nullable = false)
    private int hoursCount;
    @Temporal(TemporalType.DATE)
    @Column(name = "date_recorded", nullable = false)
    private LocalDate dateRecorded;
   
    public ProductivityLog(String activityType, int hoursCount, LocalDate dateRecorded){
        this.activityType = activityType;
        this.hoursCount = hoursCount;
        this.dateRecorded = dateRecorded;
    }
    
    @Override
    public String toString(){
        String jsonFormat = """
            {
                "id": %d,
                "activityType": "%s",
                "hoursCount": %d,
                "dateRecorded": "%s"
            }
        """;
        String formattedJson = String.format(jsonFormat, this.getId(), this.getActivityType(),
                                                               this.hoursCount, this.dateRecorded);   
        return formattedJson;
    }
}
