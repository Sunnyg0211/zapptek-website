import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function AdminTestimonials() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    video_url: "",
    thumbnail: ""
  });

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    const { data } = await supabase
      .from("video_testimonials")
      .select("*");

    setVideos(data || []);
  }

  async function addVideo() {
    await supabase
      .from("video_testimonials")
      .insert([form]);

    loadVideos();
  }

  return (
    <div>
      <h2>Add Video Testimonial</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Video URL"
        onChange={(e) =>
          setForm({ ...form, video_url: e.target.value })
        }
      />

      <button onClick={addVideo}>
        Add Video
      </button>
    </div>
  );
}
