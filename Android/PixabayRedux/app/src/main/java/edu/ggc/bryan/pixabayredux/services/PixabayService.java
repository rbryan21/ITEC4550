package edu.ggc.bryan.pixabayredux.services;

import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;

public interface PixabayService {
    String BASE_URL = "http://pixabay.com";
    String PATH = "/api/?key=6618674-d6a674d2ea17eb027168c8dd9&"
            + "editor_choice=true&safesearch=true&image_type=photo";
    String FEED = BASE_URL + PATH;

    Retrofit retrofit = new Retrofit.Builder().baseUrl(BASE_URL).
            addConverterFactory(GsonConverterFactory.create()).build();

    @GET(FEED)
    Call<PixabayHttpResponse> getResponse();
}
