in_thread do
  use_synth :piano
  with_fx :gverb do
    loop do
      play rrand_i(60, 72)
      sleep 0.5
    end
  end
end
loop do
  play 60
  sleep 0.5
end
