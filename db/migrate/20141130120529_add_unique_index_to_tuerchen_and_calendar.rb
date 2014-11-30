class AddUniqueIndexToTuerchenAndCalendar < ActiveRecord::Migration
  def change
    add_index :imps, [:calendar, :tuerchen], unique: true
  end
end
