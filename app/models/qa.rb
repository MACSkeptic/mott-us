class Qa < ActiveRecord::Base
  belongs_to :user

  EMAIL_REGEXP = %r!^[\w._]+@[\w_]+\.([\w_]{3,10})(\.([\w_]{2,3})){0,1}$!

  validates_presence_of :name
  validates_presence_of :email

  validates_uniqueness_of :name
  validates_uniqueness_of :email

  validates_format_of :email, 
    :with => EMAIL_REGEXP, 
    :message => "is invalid"

  def interests
    (self.interests_as_string.nil? || self.interests_as_string.empty?) ?
      [] : self.interests_as_string.split('interesting')
  end

  def interests=(value)
    self.interests_as_string = (value.nil? || value.empty?) ?
      '' : value.join('interesting') 
  end
end
