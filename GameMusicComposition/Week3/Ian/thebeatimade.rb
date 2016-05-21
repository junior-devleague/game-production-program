4.times do
  use_synth :sine
  use_bpm 120
  play:Gs4, release: 1
  sleep 1
  play:G3, release: 0.125
  sleep 1
  play:G3, release: 0.125
  sleep 1
  play:Gs4, release: 1
  sleep 1
end




