package edu.ggc.bryan.hbuilding;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class ThirdFloorActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_third_floor);
        setTitle(getString(R.string.h_building_page_title));
    }
}
