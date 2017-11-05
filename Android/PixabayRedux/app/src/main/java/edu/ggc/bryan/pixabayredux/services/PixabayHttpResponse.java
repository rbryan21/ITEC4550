package edu.ggc.bryan.pixabayredux.services;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import edu.ggc.bryan.pixabayredux.models.Hit;

public class PixabayHttpResponse {

    @SerializedName("totalHits")
    @Expose
    private long totalHits;
    @SerializedName("hits")
    @Expose
    private List<Hit> hits = null;
    @SerializedName("total")
    @Expose
    private long total;

    public long getTotalHits() {
        return totalHits;
    }

    public void setTotalHits(long totalHits) {
        this.totalHits = totalHits;
    }

    public List<Hit> getHits() {
        return hits;
    }

    public void setHits(List<Hit> hits) {
        this.hits = hits;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }
}
