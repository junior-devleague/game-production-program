5.times do
  2.times do
    use_synth :hollow
    with_fx :echo, decay: 2, max_phase: 0.5 do
      sample :ambi_haunted_hum, sustain_level: 1
      sleep 0.25
      play_pattern_timed [79,80,78,68,56,69,70,69], [2.5,0.75]
      sleep rrand(0.75, 2.3)
    end
  end
  
  play :g5, release: 2.5
  use_random_seed 30
  2.times do
    use_synth :hollow
    with_fx :echo, decay: 2, max_phase: 0.5 do
      play_pattern_timed [69,70], [2.5, 0.75]
      sleep rrand(0.2, 2.3)
    end
  end
end
