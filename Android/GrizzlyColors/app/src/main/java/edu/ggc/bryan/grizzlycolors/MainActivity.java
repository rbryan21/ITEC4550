package edu.ggc.bryan.grizzlycolors;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.mainView).getBackground().setAlpha(120);

        Button updateButton = (Button) findViewById(R.id.buttonUpdate);
        Button aboutButton = (Button) findViewById(R.id.buttonAbout);
        final SeekBar redSeekBar = (SeekBar) findViewById(R.id.seekbarRed);
        final SeekBar greenSeekBar = (SeekBar) findViewById(R.id.seekbarGreen);
        final SeekBar blueSeekbar = (SeekBar) findViewById(R.id.seekbarBlue);
        final SeekBar alphaSeekBar = (SeekBar) findViewById(R.id.seekbarAlpha);
        final TextView hexTextView = (TextView) findViewById(R.id.textViewHex);

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.i("GrizzlyColors", "Seek Bar red = " + redSeekBar.getProgress());
                Log.i("GrizzlyColors", "Seek Bar green = " + greenSeekBar.getProgress());
                Log.i("GrizzlyColors", "Seek Bar blue = " + blueSeekbar.getProgress());
                Log.i("GrizzlyColors", "Seek Bar alpha = " + alphaSeekBar.getProgress());
                int color = Color.argb(alphaSeekBar.getProgress(), redSeekBar.getProgress(), greenSeekBar.getProgress(), blueSeekbar.getProgress());
                Log.i("GrizzlyColors", color + "");
                hexTextView.setBackgroundColor(color);
                hexTextView.setText(String.format("#%08X", (0xFFFFFFFF & color)));
                hexTextView.setTextColor(Color.argb(alphaSeekBar.getProgress(), 255 - redSeekBar.getProgress(), 255 - greenSeekBar.getProgress(), 255 - blueSeekbar.getProgress()));
            }
        });

        aboutButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                Context context = getApplicationContext();
                CharSequence text = "Created by Robert Bryan - September 30th, 2017";
                int duration = Toast.LENGTH_SHORT;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
            }
        });

    }
}
