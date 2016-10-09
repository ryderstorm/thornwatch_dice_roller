require 'awesome_print'
require 'sinatra'
require 'pry'

set :root, File.dirname(__FILE__)
set :views, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__)
set :bind, '0.0.0.0'
set :port, 5555

get '/' do
  haml :index
end
