package edu.ggc.bryan.pixabayredux;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;

import java.io.IOException;
import java.util.Locale;

import edu.ggc.bryan.pixabayredux.models.Hit;
import edu.ggc.bryan.pixabayredux.services.PixabayHttpResponse;
import edu.ggc.bryan.pixabayredux.services.PixabayResult;
import edu.ggc.bryan.pixabayredux.services.PixabayService;
import edu.ggc.bryan.pixabayredux.utils.NetworkHelper;
import retrofit2.Call;

public class MainActivity extends AppCompatActivity {

    private ImageView imageView;
    private PixabayResult result = null;
    private boolean networkOk;
    private TextToSpeech tts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        tts = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                tts.setLanguage(Locale.US);
            }
        });
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        imageView = (ImageView) findViewById(R.id.imageView);
        networkOk = NetworkHelper.hasNetworkStatus(this);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (networkOk) {
                    new FetchAsyncTask(view).execute();
                }
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            Intent intent = new Intent(this, AboutActivity.class);
            startActivity(intent);
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public class FetchAsyncTask extends AsyncTask<Void, Void, Integer> {

        View view;

        public FetchAsyncTask(View view) {
            this.view = view;
        }

        @Override
        protected Integer doInBackground(Void... voids) {
            int currentIndex = 0;
            PixabayService service = PixabayService.retrofit.create(PixabayService.class);
            Call<PixabayHttpResponse> call = service.getResponse();
            try {
                if (result == null || result.isExpired()) {
                    result = new PixabayResult(call.execute().body());
                }
                currentIndex = (int)(Math.random() * result.size());
                Log.v("PixabayRedux", "The current index = " + currentIndex + " of a total size of " + result.size());
                return currentIndex;
            } catch (IOException e) {
                e.printStackTrace();
            }
            return currentIndex;
        }

        @Override
        protected void onPostExecute(Integer currentIndex) {
            super.onPostExecute(currentIndex);
            Hit currentHit = result.getHit(currentIndex);
            Bitmap currentHitBitmap = result.getBitmap(currentIndex);
            Log.v("PixabaySampler", "resulting hit = " + currentHit.getUserImageURL());
            imageView.setImageBitmap(currentHitBitmap);
            tts.speak(currentHit.getTags(), TextToSpeech.QUEUE_FLUSH, null);
            Snackbar.make(view, currentHit.getTags(), Snackbar.LENGTH_LONG)
                    .setAction("Action", null).show();
        }
    }
}
