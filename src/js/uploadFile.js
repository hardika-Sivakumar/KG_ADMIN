const uploadFile = async (file, image_path,BACKEND_URL) => {

    const formData = new FormData()
    formData.append("file", file)
    formData.append("image_path", image_path)

    const uploadRequest = await fetchWithTimeout(
      `${BACKEND_URL}/store/upload_file`,
      {
        method: "POST",
        body: formData
      },
    )

    const uploadResponse = await uploadRequest.json()

    if (!uploadResponse.success) {
      //handle error
      alert(uploadResponse.message)
      return ""
    }
    else {
      //handleSucces
      return uploadResponse?.image_url
    }

  }