package edu.ggc.bryan.pixabayredux.services;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

import edu.ggc.bryan.pixabayredux.models.Hit;

public class PixabayResult {

    private final static long DAY_MILLIS = TimeUnit.DAYS.toMillis(1);

    private long created;
    private HashMap<Long, Bitmap> bitmaps;
    private HashMap<Long, Hit> hits;
    private PixabayHttpResponse response; // taken from jsonschema2pojo without mod

    private long hitCount = 0;

    public PixabayResult(PixabayHttpResponse response) throws IOException {

        this.created = System.currentTimeMillis(); // birthday!
        this.response = response;
        cacheHits(response.getHits());
        cacheBitmaps(response.getHits());
    }

    // use hashmap rather than ArrayList since indexes are type long
    private void cacheHits(List<Hit> list) throws IOException {
        this.hits = new HashMap<>();
        for (Hit hit : list) {
            hitCount++;
            hits.put(hitCount - 1, hit); // zero based indexing
        }
    }

    private void cacheBitmaps(List<Hit> list) throws IOException {
        this.bitmaps = new HashMap<>();
        for (Hit hit : list) {
            InputStream stream = new URL(hit.getWebformatURL()).openStream();
            bitmaps.put(hit.getId(), BitmapFactory.decodeStream(stream));
        }
    }

    public boolean isExpired() {
        return created - System.currentTimeMillis() > DAY_MILLIS ? true : false;
    }

    public long size() {
        return hitCount;
    }

    public String getTags(long index) {
        return getHit(index).getTags();
    }

    public Hit getHit(long index) {
        return hits.get(index);
    }

    public Bitmap getBitmap(int index) {
        long id = getHit(index).getId(); // convert response index to Pixabay's id
        return bitmaps.get(id);
    }

    public static long getRandomLong(long maximum) {
        return getRandomLong(0L, maximum);
    }

    public static long getRandomLong(long minimum, long maximum) {
        return ((long) (Math.random() * (maximum - minimum))) + minimum;
    }
}