require 'awesome_print'
require 'sinatra'
require 'pry'

def regular_die_roll
  case rand(10)
  when 0
    :ebb
  when 1
    :miss
  when 2
    :miss
  when 3
    :miss
  when 4
    :hit
  when 5
    :hit
  when 6
    :hit
  when 7
    :hit
  when 8
    :hit
  when 9
    :double_hit
  end
end

def hero_die_roll
  case rand(10)
  when 0
    :miss
  when 1
    :miss
  when 2
    :hit
  when 3
    :hit
  when 4
    :hit
  when 5
    :hit
  when 6
    :hit
  when 7
    :hit
  when 8
    :double_hit
  when 9
    :double_hit
  end
end

def random_dice_sound
  sound_file = Dir.glob('public/sounds/*.mp3').sample.sub('public', '')
  puts "Sound file: #{sound_file}".yellow
  sound_file
end

set :bind, '0.0.0.0'
set :port, 5555
get '/' do
  haml :die_select
end

get '/die_select' do
  haml :die_select
end

post '/roll_results' do

  regular_rolls = [
    params["regular1"],
    params["regular2"],
    params["regular3"],
    params["regular4"]
  ].select { |r| r == 'on'}.count

  hero_rolls = [
    params["hero1"],
    params["hero2"]
  ].select { |r| r == 'on'}.count

  @roll_results = []
  regular_rolls.times { @roll_results << regular_die_roll }
  hero_rolls.times { @roll_results << hero_die_roll }
  (9 - @roll_results.count).times { @roll_results << 'empty' }
  @roll_results.shuffle!
  ap @roll_results
  haml :roll_results
end

get '/roll_results_test' do

  @roll_results = {
    ebb_count: 1,
    miss_count: 2,
    hit_count: 3,
    doublt_hit_count: 1
  }

  haml :roll_results
end
