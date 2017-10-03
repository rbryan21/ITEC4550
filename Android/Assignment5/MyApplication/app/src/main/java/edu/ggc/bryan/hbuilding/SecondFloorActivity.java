package edu.ggc.bryan.hbuilding;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class SecondFloorActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second_floor);
        setTitle(getString(R.string.h_building_page_title));
    }
}
