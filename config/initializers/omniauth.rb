Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV["google_key"], ENV["google_secret"],
    scope: "email, userinfo.profile",
    image_aspect_ratio: "square",
    image_size: 50
    
end
