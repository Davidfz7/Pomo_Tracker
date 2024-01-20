package main.dto;


import java.time.LocalDate;

import java.util.Arrays;
import java.util.List;
import lombok.Data;

@Data
public class ProductivityLogDTO {
    private String activityType;
    private int hoursCount;
    private String dateRecorded;
    
    public LocalDate getDateRecordedAsLocalDate(){
        List<String> parts = Arrays.asList(dateRecorded.split("-"));
        LocalDate customDate = LocalDate.of(Integer.parseInt(parts.get(0)), Integer.parseInt(parts.get(1)), Integer.parseInt(parts.get(2)));
        return customDate;
    }
    @Override
    public String toString(){
            return "ProductivityLogDTO{" +
                ", activityType='" + activityType + '\'' +
                ", hoursCount=" + hoursCount +
                ", dateRecorded='" + dateRecorded + '\'' +
                '}';
    }
}
