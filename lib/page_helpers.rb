module PageHelpers

  def markdown(text)
    return unless text

    Tilt['markdown'].new { text }.render(scope=self)
  end

end