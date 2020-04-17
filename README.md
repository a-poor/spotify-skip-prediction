# Predicting Spotify Track Skips

![cover image](images/coverimage.png)

_by Austin Poor_

This is the code for my third project for the [Metis Data Science Bootcamp](https://www.thisismetis.com/data-science-bootcamps). We each chose our own topics but were required to use PostgreSQL to store our data and classification to model our data.

For my project, I chose to work on a slightly simplified version of the [Spotify Sequential Skip Prediction Challenge](https://www.aicrowd.com/challenges/spotify-sequential-skip-prediction-challenge). The goal of the project was to use data supplied by Spotify, with information on anonamyzed user listening sessions, to predict whether or not a user would skip a given song in a sequence.

You can find the blog post I wrote about the project [here](https://towardsdatascience.com/predicting-spotify-track-skips-49cf4a48b2a5).

***

## Navigating the Repo

Performed EDA in the notebook: [spotify_data_eda.ipynb](spotify_data_eda.ipynb)

Modeled the data in the notebook: [lgbm_model_single_history.ipynb](lgbm_model_single_history.ipynb)

I included a copy of my presentation deck as a PDF, [here](spotifySkipPrediction_presentation.pdf)

You can find plot's I've generated in the [images/](images/) directory but for explanations of the plots, see either my presentation deck or blog post, as most plots were generated for one or the other.

I've also included one of the final versions of my `LightGBM` model (which got an accuracy of `0.73`) as a pickle file, [here](lgbm_model_0.73TestAcc.pkl).

***

## References

The link to the original challenge, where you can download the data, is [here](https://www.aicrowd.com/challenges/spotify-sequential-skip-prediction-challenge).

\[1] B. Brost, R. Mehrotra, and T. Jehan, The Music Streaming Sessions Dataset (2019), Proceedings of the 2019 Web Conference
