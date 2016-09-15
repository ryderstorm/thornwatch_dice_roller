require 'awesome_print'
require 'sinatra'
require 'pry'

set :bind, '0.0.0.0'
set :port, 5555
get '/' do
  haml :die_select
end
