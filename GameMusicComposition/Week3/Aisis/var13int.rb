in_thread do
  use_synth  :beep
  with_fx :gverb do
    loop do
      play choose([60,61,62,63,64,65,66,67,68,69,70,71,72])
      sleep 0.5
      play scale(:c, :prometheus).choose
      sleep 0.5
    end
  end
end
loop do
  use_synth :chipbass
  with_fx :gverb do
    play 60
    sleep 0.5
  end
end

