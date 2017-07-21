activate :autoprefixer do |config|
  config.browsers = ['last 4 versions']
end
activate :directory_indexes

require "lib/image_helpers"
helpers ImageHelpers

require "lib/page_helpers"
helpers PageHelpers

set :css_dir, 'styles'
set :js_dir, 'scripts'
set :images_dir, 'images'

activate :external_pipeline,
  name: :webpack,
  command: build? ? "./node_modules/webpack/bin/webpack.js --bail -p" : "./node_modules/webpack/bin/webpack.js --watch --progress",
  source: ".tmp/dist",
  latency: 1

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_css
  activate :asset_hash, ignore: [/^scripts\/\w+\.\w+\.js$/] # Let webpack add hashes to chunks so we can dynamically import them
end