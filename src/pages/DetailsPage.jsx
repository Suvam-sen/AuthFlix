import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Divider from "../components/Divider";
import HorizontalScollCard from "../components/HorizontalScollCard";
import VideoPlay from "../components/VideoPlay";
import useFetch from "../hooks/useFetch";
import useFetchDetails from "../hooks/useFetchDetails";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (videoId) => {
    setPlayVideoId(videoId);
    setPlayVideo(true);
  };

  // Ensure runtime is defined
  const duration = data?.runtime
    ? (data.runtime / 60).toFixed(1).split(".")
    : ["0", "0"];

  // Find Director
  const director =
    castData?.crew
      ?.filter((el) => el?.job === "Director")
      ?.map((el) => el?.name)
      ?.join(", ") || "Unknown";

  // Find Writers
  const writer =
    castData?.crew
      ?.filter((el) => el?.job === "Writer")
      ?.map((el) => el?.name)
      ?.join(", ") || "Unknown";

  return (
    <div>
      {/* Background Image */}
      {data?.backdrop_path && (
        <div className="w-full h-[280px] relative hidden lg:block">
          <img
            src={imageURL + data.backdrop_path}
            className="h-full w-full object-cover"
            alt="Backdrop"
          />
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        {/* Movie Poster */}
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {data?.poster_path ? (
            <img
              src={imageURL + data.poster_path}
              className="h-80 w-60 object-cover rounded"
              alt="Poster"
            />
          ) : (
            <div className="h-80 w-60 bg-gray-800 flex items-center justify-center text-white rounded">
              No Image Available
            </div>
          )}

          {/* Play Button */}
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        {/* Movie Info */}
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />

          {/* Rating, Views, Duration */}
          <div className="flex items-center gap-3">
            <p>Rating: {Number(data?.vote_average || 0).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {data?.vote_count?.toLocaleString() || "N/A"}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>
          <Divider />

          {/* Overview */}
          <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
          <p>{data?.overview || "No description available."}</p>
          <Divider />

          {/* Release Date, Revenue, Status */}
          <div className="flex items-center gap-3 my-3 text-center">
            <p>Status: {data?.status || "Unknown"}</p>
            <span>|</span>
            <p>
              Release Date: {moment(data?.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>
            <p>
              Revenue: $
              {data?.revenue ? Number(data.revenue).toLocaleString() : "N/A"}
            </p>
          </div>
          <Divider />

          {/* Director and Writers */}
          <p>
            <span className="text-white">Director:</span> {director}
          </p>
          <Divider />
          <p>
            <span className="text-white">Writer:</span> {writer}
          </p>
          <Divider />

          {/* Cast */}
          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast, index) => (
                <div key={uuidv4()}>
                  <img
                    src={imageURL + starCast.profile_path}
                    className="w-24 h-24 object-cover rounded-full"
                    alt={starCast.name}
                  />
                  <p className="font-bold text-center text-sm text-neutral-400">
                    {starCast.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Similar & Recommended Shows */}
      <HorizontalScollCard
        data={similarData}
        heading={"Similar " + params.explore}
        media_type={params.explore}
      />
      <HorizontalScollCard
        data={recommendationData}
        heading={"Recommendation " + params.explore}
        media_type={params.explore}
      />

      {/* Video Modal */}
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
