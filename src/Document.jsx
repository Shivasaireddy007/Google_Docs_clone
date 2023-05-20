import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { toolbar_options } from "./common";

const SAVE_INTERVAL_MS = 2000;

export default function Document() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    const s = io("https://sg-google-docs-clone.herokuapp.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      quill.off("receive-changes", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    var Size = Quill.import("attributors/style/size");
    Size.whitelist = [
      "9px",
      "10px",
      "11px",
      "12px",
      "14px",
      "16px",
      "18px",
      "20px",
      "22px",
      "24px",
      "26px",
      "28px",
    ];
    Quill.register(Size, true);

    const handleImageUpload = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await fetch("YOUR_IMAGE_UPLOAD_URL", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const imageUrl = await response.json();
            insertImage(imageUrl);
          } else {
            console.error("Image upload failed");
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      };
    };
    const insertImage = (imageUrl) => {
      const quill = this.quillRef.getEditor(); // Get Quill instance

      const range = quill.getSelection(); // Get current selection
      const index = range ? range.index : 0;

      quill.insertEmbed(index, "image", imageUrl, "user"); // Insert the image at the current selection
      quill.setSelection(index + 1); // Move the cursor after the inserted image
    };
    const handleLinkInsert = () => {
      const url = window.prompt("Enter the URL:");
      if (url) {
        const quill = this.quillRef.getEditor();
        quill.format("link", url);
      }
    };

    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [...toolbar_options],
          handlers: {
            image: handleImageUpload,
            link: handleLinkInsert,
          },
        },
      },
    });
    q.disable(false);
    q.setText("Type @ to insert");
    
    setQuill(q);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}
