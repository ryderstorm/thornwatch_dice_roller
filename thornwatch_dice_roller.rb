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
    params["regular4"],
    params["regular5"]
  ]

  hero_rolls = [
    params["hero1"],
    params["hero2"]
  ]

  r = regular_rolls.select { |r| r == 'on'}.collect { |r| regular_die_roll }

  h = hero_rolls.select { |r| r == 'on'}.collect { |r| hero_die_roll }

  # all_rolls = regular_rolls + hero_rolls
  all_rolls = r + h

  @roll_results = {
    ebb_count: all_rolls.select { |r| r == :ebb }.count,
    miss_count: all_rolls.select { |r| r == :miss }.count,
    hit_count: all_rolls.select { |r| r == :hit }.count,
    doublt_hit_count: all_rolls.select { |r| r == :double_hit }.count
  }

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
