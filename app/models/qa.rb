class Qa < ActiveRecord::Base
  belongs_to :user

  def interests
    (self.interests_as_string.nil? || self.interests_as_string.empty?) ?
      [] : self.interests_as_string.split('interesting')
  end

  def interests=(value)
    self.interests_as_string = (value.nil? || value.empty?) ?
      '' : value.join('interesting') 
  end
end
