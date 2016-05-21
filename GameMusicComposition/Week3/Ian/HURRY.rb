use_synth :piano
5.times do
  2.times do
    play :G5, release: 2.5
    sleep 2.3
    play :Gs5, release: 0.75
    sleep 0.75
    play :G4, release: 2.5
    sleep 2.3
    play :gs4, release: 0.75
    sleep 0.75
    play :Gs3, release: 2.5
    sleep 2.3
    play :A4, release: 0.75
    sleep 0.75
    play :As4, release: 2.5
    sleep 2.3
    play :A4, release: 0.75
    sleep 0.75
    play :As4, release: 2.5
  end
  play :G5, release: 2.5
  2.times do
    play :As4, release: 2.5
    sleep 2.3
    play :A4, release: 0.25
    sleep 0.2
    play :A4, release: 0.25
    sleep 0.7
    play :As4, release: 2.5
  end
end
