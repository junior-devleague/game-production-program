loop do
  2.times do
    use_synth :piano
    play_pattern_timed [60,67,65,60,64,64,65],[0.5], decay: 0.5, sustain: 0.5
  end
  1.times do
    
    play_pattern_timed [62,69,67,62,65,65,67,65,64],[0.5], decay: 0.5, sustain: 0.5
  end
end
