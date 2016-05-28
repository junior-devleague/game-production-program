loop do
  with_fx :reverb do
    2.times do
      sample :vinyl_hiss
      use_synth :piano
      play_pattern_timed [60,67,65,60,64,64,65],[0.4], decay: 0.5, sustain: 0.6
      sample :bd_klub
      
    end
    
    1.times do
      sample :ambi_glass_hum, pitch:rand(1)
      play_pattern_timed [62,69,67,62,65,65,67,65,64],[0.4], decay: 0.5, sustain: 0.6
      sample :bd_boom
    end
  end
end
