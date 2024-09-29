const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

// Set the output path
// ffmpeg.setFfmpegPath('/opt/homebrew/bin/ffmpeg');
// // Optional: Set the path to FFprobe (use the same method as for ffmpeg)
// ffmpeg.setFfprobePath('/opt/homebrew/bin/ffmpeg');
const outputPath = path.join(__dirname, "output.mp4");

// Configure the input device IDs for the camera and microphone
const videoInput = "0"; // Use the correct video input ID (e.g., FaceTime HD Camera)
const audioInput = "1"; // Use the correct audio input ID (e.g., MacBook Pro Microphone)

// Create a fluent-ffmpeg command
const command = ffmpeg()
  .input(`${videoInput}:${audioInput}`) // Set input devices
  .inputFormat("avfoundation") // Set the format to AVFoundation for macOS
  .videoCodec("libx264") // Use the H.264 video codec
  .audioCodec("aac") // Use the AAC audio codec
  .audioBitrate("32k") // Set the audio bitrate
  .videoBitrate("15k") // Set the video bitrate
  .size("640x480") // Set the video resolution
  .fps(30) // Set the input framerate to 30 FPS (as per your working command)
  .outputOptions([
    "-vf fps=1", // Apply the frame rate filter to output 1 FPS
    "-movflags +faststart", // Optimize for streaming
  ])
  .duration(10) // Limit the recording to 10 seconds
  .on("start", (commandLine) => {
    console.log("FFmpeg process started:", commandLine);
  })
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.percent}% done`);
  })
  .on("end", () => {
    console.log("Recording finished successfully");
  })
  .on("error", (err) => {
    console.error("Error occurred:", err.message);
  })
  .save(outputPath); // Save the output video

// Set timeout to stop the recording after 10 seconds
setTimeout(() => {
  console.log("Stopping the recording...");
  command.kill("SIGINT"); // Sends a signal to stop FFmpeg
}, 10000); // 10 seconds timeout
