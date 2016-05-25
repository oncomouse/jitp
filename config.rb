###
# Compass
###
set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true,
			   :autolink => true, 
			   :smartypants => true,
			   :footnotes => true,
			   :superscript => true

# Change Compass configuration
$bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
sprockets.append_path File.join "#{root}", $bower_config["directory"]
compass_config do |config|
		config.add_import_path File.join "#{root}", $bower_config["directory"]
end

set :haml, { :ugly => false, :format => :html5 }

# Turn this off to not use Glyphicons (Middleman won't copy the font files at build):
config[:use_glyphicons] = false

###
# Page options, layouts, aliases and proxies
###

page "*", :layout => "layout"

###
# Helpers
###

require 'rack/rewrite'

# Configure sprockets to add our bower root to its path:
after_configuration do
    # Use Rack::Rewrite to dynamically proxy the Bootstrap glyphicon directory:
    if config[:use_glyphicons] and File.exists? File.join($bower_config['directory'], "bootstrap-sass-official/assets/fonts/bootstrap")
        use Rack::Rewrite do
            rewrite %r{^\/fonts\/bootstrap\/(.*)}, File.join($bower_config['directory'].gsub(/\/{0,1}source\//,'/'), "bootstrap-sass-official/assets/fonts/bootstrap") + '/$1'
        end
    end

	config[:local_font_awesome] = false
end

helpers do
	def javascript_path(file_path)
		asset_path(:js, file_path)
	end
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Build-specific configuration
configure :build do

    # Don't edit these lines:
	ignore "stylesheets/*"
	ignore "stylesheets/**/*"
	ignore "javascripts/**/*"
	ignore "javascripts/*"
	ignore 'vendor/**/*'
	ignore "**/*.csv"
	ignore "**/*.json"
	
	# Change this to build with a different file root.
	set :http_prefix, "/jitp"
	
	activate :minify_css
    activate :minify_javascript, :inline => true
    activate :inliner
    activate :minify_html do |html|
  	  html.remove_comments = true
	  #html.preserve_patterns = [
	  #	  /<script[^>]+type=.*?text\/[^>]+>.*?<\/script>/ # Preserve our data source inclusions
	  #]
    end
	activate :cache_buster
end

require 'fileutils'
after_build do    
    if config[:use_glyphicons] and File.exists? File.join($bower_config['directory'], "bootstrap-sass-official/assets/fonts/bootstrap")
        FileUtils.mkdir_p "#{config[:build_dir]}/fonts/bootstrap/"
        printf "\033[1m\033[32m%12s\033[0m  %s\n", "copying", "#{File.join($bower_config['directory'], "bootstrap-sass-official/assets/fonts/bootstrap")}/"
        system("cp -r #{File.join($bower_config['directory'], "bootstrap-sass-official/assets/fonts/bootstrap")}/* build/fonts/bootstrap/")
    end
end

activate :deploy do |deploy|
	deploy.method = :rsync
	deploy.user = "shawnaross"
	deploy.host = "copland.dreamhost.com"
	deploy.path = "~/www/shawnaross.com/jitp"
end