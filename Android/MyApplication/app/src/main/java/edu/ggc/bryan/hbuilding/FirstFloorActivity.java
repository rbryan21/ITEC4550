package edu.ggc.bryan.hbuilding;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class FirstFloorActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_first_floor);
        setTitle(getString(R.string.h_building_page_title));
    }
}
